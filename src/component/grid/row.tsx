let enquire: any

if (typeof window !== 'undefined') {
  const matchMediaPolyfill = (mediaQuery: string): MediaQueryList => {
    return {
      media: mediaQuery,
      matches: false,
      addListener() {
      },
      removeListener() {
      },
    }
  }

  window.matchMedia = window.matchMedia || matchMediaPolyfill
  enquire = require('enquire.js')
}

import * as React from 'react'
import classNames from 'classnames'

export type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs'
export type BreakpointMap = Partial<Record<Breakpoint, string>>


const responsiveArray: Breakpoint[] = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];

const responsiveMap: BreakpointMap = {
  xs: '(max-width: 575px)',
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 992px)',
  xl: '(min-width: 1200px)',
  xxl: '(min-width: 1600px)',
}

/**
 * gutter 使用索引类型Partial，Record（动态）
 * 值: 9 或者 { 'xxl': 9 }
 * 
 */
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
  gutter?: number | Partial<Record<Breakpoint, number>>
  type?: 'flex'
  align?: 'top' | 'middle' | 'bottom'
  justify?: 'start' | 'end' | 'center' | 'space-around' | 'space-between'
  prefixCls?: string
}

export interface RowState {
  screens: BreakpointMap
}

export default class LiRow extends React.Component<RowProps, RowState>{
  public state: RowState
  constructor(props: any) {
    super(props)
    this.state = {
      screens: {}
    }
  }

  static defaultProps = {
    gutter: 0,
  }

  componentDidMount() {
    Object.keys(responsiveMap)
      .map((screen: Breakpoint) => enquire.register(responsiveMap[screen], {

        match: () => {
          if (typeof this.props.gutter !== 'object') return
          this.setState((preState) => ({
            screens: {
              ...preState.screens,
              [screen]: true,
            },
          }))
        },

        unmatch: () => {
          if (typeof this.props.gutter !== 'object') return
          this.setState((preState) => ({
            screens: {
              ...preState.screens,
              [screen]: false,
            },
          }))
        },

        destroy: () => { },
      }))
  }

  componentWillUnmount() {
    Object.keys(responsiveMap)
      .map((screen:Breakpoint)=> enquire.unregister(responsiveMap[screen]))
  }

  private getGutter(): number | any {
    const { gutter } = this.props
    if (typeof gutter === 'object') {
      //  此处用for循环，用以在循环中结束getGutter函数返回结果（整个function处于一个同步环境）
      for (let i = 0; i < responsiveArray.length; i++) {
        const breakpoint = responsiveArray[i]
        if (this.state.screens[breakpoint] && gutter[breakpoint] !== undefined) {
          return gutter[breakpoint]
        }
      }
    }

    return gutter
  }

  public render() {
    const { className, type, justify,
      align, children, style,
      prefixCls = 'ant-row', ...others } = this.props

    const gutter = this.getGutter()
    const classes = classNames({
      [prefixCls]: !type,
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${type}-${justify}`]: type && justify,
      [`${prefixCls}-${type}-${align}`]: type && align,
    }, className)

    const rowStyle = (gutter as number) > 0 ? {
      marginLeft: (gutter as number) / -2,
      marginRight: (gutter as number) / -2,
      ...style,
    } : style

    const cols = React.Children.map(children, (col: React.ReactElement<HTMLDivElement>) => {
      if (!col) return null
      if (col.props && (gutter as number) > 0) {
        return React.cloneElement(col, {
          style: {
            paddingLeft: (gutter as number) / 2,
            paddingRight: (gutter as number) / 2,
            ...col.props.style,
          },
        })
      }
      return col
    })

    const otherProps = { ...others }
    delete otherProps.gutter

    return (
      <div {...otherProps} className={classes} style={rowStyle}>{cols}</div>
    )
  }
}
