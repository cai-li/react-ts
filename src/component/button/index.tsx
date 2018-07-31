import * as React from 'react'
import classNames from 'classnames'
import './button.less'
import LiIcon from 'component/icon/icon'
import { findDOMNode } from 'react-dom';

const rxTwoCNChar = /^[\u4e00-\u9fa5]{2}$/; //匹配两个汉字
const isTwoCNChar = rxTwoCNChar.test.bind(rxTwoCNChar);
function isString(str: any) {
  return typeof str === 'string';
}

/**
 * 只有一个子节点且只有两个字符的，插入空格
 * 字节点为String的用span包含
 * 
 * @param {React.ReactChild} child 
 * @param {boolean} needInserted 
 * @returns 
 */
function insertSpace(child: React.ReactChild, needInserted: boolean) {
  if (!child) return
  const SPACE = needInserted ? ' ' : '';

  if (typeof child !== 'string' && typeof child !== 'number' &&
    isString(child.type) && isTwoCNChar(child.props.children)) {
    return React.cloneElement(child, {},
      child.props.children.split('').join(SPACE))
  }

  if (typeof child === 'string') {
    if (isTwoCNChar(child)) {
      child = child.split('').join(SPACE)
    }
    return <span>{child}</span>;
  }

  return child;
}

export type ButtonType = 'default' | 'primary' | 'ghost' | 'dashed' | 'danger'
export type ButtonShape = 'circle' | 'circle-outline'
export type ButtonSize = 'small' | 'default' | 'large'
export type ButtonHTMLType = 'submit' | 'button' | 'reset'

interface BaseButtonProps {
  type?: ButtonType
  icon?: string
  shape?: ButtonShape
  size?: ButtonSize
  loading?: boolean | { delay?: number }
  prefixCls?: string
  className?: string
  ghost?: boolean
}

export type AnchorButtonProps = {
  href: string;
  target?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
} & BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;

export type NativeButtonProps = {
  htmlType?: ButtonHTMLType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type ButtonProps = AnchorButtonProps | NativeButtonProps;

export default class LiButton extends React.Component<ButtonProps, any> {

  private timeout: number
  private delayTimeout: number

  static defaultProps = {
    prefixCls: 'ant-btn',
    loading: true,
    ghost: false,
  }

  constructor(props: ButtonProps) {
    super(props)
    this.state = {
      clicked: false,
      hasTwoCNChar: false,
      loading: props.loading,
    }
  }

  componentDidMount() {
    this.fixTwoCNChar()
  }

  // 已挂在的组件在接收新 props 之前被调用，使state相应props的更改
  componentWillReceiveProps(nextProps: ButtonProps) {
    const currentLoading = this.props.loading
    const loading = nextProps.loading
    console.log(currentLoading, loading)

    if (currentLoading) {
      clearTimeout(this.delayTimeout)
    }

    if (typeof loading !== 'boolean' && loading && loading.delay) {
      this.delayTimeout = window.setTimeout(() => this.setState({ loading }), loading.delay)
    } else {
      this.setState({ loading })
    }
  }

  // 组件已更新时，使用此方法作为操作 DOM 的一个机会
  componentDidUpdate() {
    this.fixTwoCNChar();
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout)
    if (this.delayTimeout) clearTimeout(this.delayTimeout)
  }

  private fixTwoCNChar() {
    const node = (findDOMNode(this) as HTMLElement)
    const buttonText = node.textContent || node.innerText
    if (this.isNeedInserted() && isTwoCNChar(buttonText)) {
      if (!this.state.hasTwoCNChar) {
        this.setState({
          hasTwoCNChar: true,
        });
      }
    } else if (this.state.hasTwoCNChar) {
      this.setState({
        hasTwoCNChar: false,
      });
    }
  }

  private handleClick: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement> = e => {
    this.setState({
      clicked: true
    });
    clearTimeout(this.timeout);
    this.timeout = window.setTimeout(() => {
      this.setState({
        clicked: false
      })
    }, 500)

    const onClick = this.props.onClick
    if (onClick) {
      (onClick as React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e)
    }
  }

  /**
   * 组件只有一个子节点
   * 
   * @returns {boolean} 
   * @memberof LiButton
   */
  isNeedInserted(): boolean {
    const { icon, children } = this.props;
    return React.Children.count(children) === 1 && !icon;
  }

  public render() {
    const {
      children, type, icon,
      shape, size, loading: _loadingProp,
      prefixCls, className, ghost, ...rest } = this.props

    const { clicked, hasTwoCNChar, loading } = this.state

    let sizeCls = '';
    switch (size) {
      case 'small':
        sizeCls = 'sm';
        break;
      case 'large':
        sizeCls = 'lg';
        break;
      default:
        break;
    }
    const classes = classNames(prefixCls, className, {
      [`${prefixCls}-${type}`]: type,
      [`${prefixCls}-${shape}`]: shape,
      [`${prefixCls}-${sizeCls}`]: sizeCls,
      [`${prefixCls}-loading`]: loading,
      [`${prefixCls}-background-ghost`]: ghost,
      [`${prefixCls}-clicked`]: clicked,
      [`${prefixCls}-two-chinese-chars`]: hasTwoCNChar
    })

    const iconType = loading ? 'loading' : icon;
    const iconNode = iconType ? <LiIcon type={iconType} /> : null
    const kids = (children || children === 0) ?
      React.Children.map(children, (child, index) => insertSpace(child, this.isNeedInserted())) : null

    if ('href' in rest) {
      return (
        <a
          {...rest}
          className={classes}
          onClick={this.handleClick}>{iconNode}{kids}</a>
      )
    } else {
      const { htmlType, ...otherProps } = rest;
      return (
        <button
          {...otherProps}
          type={htmlType || 'button'}
          className={classes}
          onClick={this.handleClick}>{iconNode}{kids}</button>
      )
    }
  }
}