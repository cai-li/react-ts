import * as React from 'react'
import classNames from 'classnames'

export interface ColSize {
  span?: number
  order?: number
  offset?: number
  push?: number
  pull?: number
}

const sizes = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

export interface ColProps extends React.HTMLAttributes<HTMLDivElement> {
  span?: number
  order?: number
  offset?: number
  push?: number
  pull?: number
  xs?: number | ColSize
  sm?: number | ColSize
  md?: number | ColSize
  lg?: number | ColSize
  xl?: number | ColSize
  xxl?: number | ColSize
  prefixCls?: string
}

export default class LiCol extends React.Component<ColProps, any> {
  public render() {
    const { span, order, offset,
      push, pull, className, children,
      prefixCls = 'ant-col', ...others } = this.props

    let sizeClassObj = {}

    sizes.forEach(size => {
      let sizeProps: ColSize = {}
      if (typeof others[size] === 'number') {
        sizeProps.span = others[size]
      } else if (typeof others[size] === 'object') {
        sizeProps = others[size] || {}
      }

      delete others[size]

      sizeClassObj = {
        ...sizeClassObj,
        [`${prefixCls}-${size}-${sizeProps.span}`]: sizeProps.span !== undefined,
        [`${prefixCls}-${size}-order-${sizeProps.order}`]: sizeProps.order || sizeProps.order === 0,
        [`${prefixCls}-${size}-offset-${sizeProps.offset}`]: sizeProps.offset || sizeProps.offset === 0,
        [`${prefixCls}-${size}-push-${sizeProps.push}`]: sizeProps.push || sizeProps.push === 0,
        [`${prefixCls}-${size}-pull-${sizeProps.pull}`]: sizeProps.pull || sizeProps.pull === 0,
      }
    })

    const classes = classNames({
      [`${prefixCls}-${span}`]: span !== undefined,
      [`${prefixCls}-order-${order}`]: order,
      [`${prefixCls}-offset-${offset}`]: offset,
      [`${prefixCls}-push-${push}`]: push,
      [`${prefixCls}-pull-${pull}`]: pull,
    }, className, sizeClassObj)

    return (
      <div {...others} className={classes}>{children}</div>
    )
  }
}