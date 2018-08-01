import * as React from 'react'
import classNames from 'classnames'
import { ButtonSize } from './index'

export interface ButtonGroupProps {
  size?: ButtonSize
  style?: React.CSSProperties
  className?: string
  prefixCls?: string
}

export default class LiButtonGroup extends React.Component<ButtonGroupProps, any> {
  constructor(props: ButtonGroupProps) {
    super(props)
    this.state = {}
  }

  public render() {
    const { size, className, prefixCls = 'ant-btn-group', ...other } = this.props

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
      [`${prefixCls}-${sizeCls}`]: sizeCls
    })
    return (
      <div className={classes} {...other}/>
    )
  }
}
