import * as React from 'react'
import classNames from 'classnames'
import omit from 'utils/omit'
import './icon.less'

export interface IconProps {
  type: string
  className?: string
  title?: string
  onClick?: React.MouseEventHandler<any>
  spin?: boolean
  style?: React.CSSProperties
}

export default class LiIcon extends React.Component<IconProps, {}> {
  constructor(props: IconProps) {
    super(props)
    this.state = {}
  }

  public render() {
    const { type, className = '', spin } = this.props
    const classString = classNames({
      iconfont: true,
      liicon: true,
      'liicon-spin': !!spin || type === 'loading',
      [`${type}`]: true
    }, className)
    return (
      <i {...omit(this.props, ['type', 'spin']) } className={classString} />
    )
  }
}
