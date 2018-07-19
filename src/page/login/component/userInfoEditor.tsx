import * as React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'

const FormItem = Form.Item

type UserInfoProps = FormComponentProps & {
  onSubmit: (value: any) => void,
  toRegister: () => void,
}

class UserInfoEditor extends React.Component<UserInfoProps, any> {
  public state: any
  constructor(props: UserInfoProps) {
    super(props as UserInfoProps)
    this.state = {}
  }

  private _submit(e: any) {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form

    return (
      <Form onSubmit={(e) => this._submit(e)}>
        <FormItem>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '用户名不能为空' }],
          })(
            <Input
              className="pageLogin-form--input"
              suffix={<Icon type="user" className="pageLogin-form--icon" />}
              placeholder="请输入用户名" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入正确密码' }],
          })(
            <Input
              className="pageLogin-form--input"
              suffix={<Icon type="lock" className="pageLogin-form--icon" />}
              type="password"
              placeholder="请输入密码" />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>,
          )}
          <p className="login-form-forgot">忘记密码</p>
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            className="login-form-button pageLogin-form--submit">登录</Button>
        </FormItem>
        <FormItem>
          <p className="login-form-forgot" onClick={this.props.toRegister}>立即注册</p>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(UserInfoEditor)
