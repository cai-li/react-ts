import * as React from 'react'
import './login.less'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import { FormComponentProps } from 'antd/lib/form/Form'
import CacheService from 'services/cacheService'
import JwtService from 'services/jwtService'
import hashHistory from 'router/history'
import UserService from 'services/userService'

const FormItem = Form.Item

class Login extends React.Component<FormComponentProps, any> {
  public state: any

  constructor(props: FormComponentProps) {
    super(props)
    this.state = {}
  }

  private async submit(e: any): Promise<void> {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        await UserService.login(values.userName, values.password)

        const query = UserService.current ? { user: UserService.current.id } : void 0
        hashHistory.push({
          pathname: '/home',
          query: { user: UserService.current.id }
        })
      }
    })
  }

  public render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="pageLogin">
        <header>

        </header>
        <main>
          <div className="pageLogin-form">
            <h1 className="pageLogin-form--title">登录</h1>
            <Form onSubmit={(e) => this.submit(e)}>
              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{ required: true, message: '用户名不能为空' }],
                })(
                  <Input className="pageLogin-form--input" suffix={<Icon type="user" className="pageLogin-form--icon" />} placeholder="请输入用户名" />
                  )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '请输入正确密码' }],
                })(
                  <Input className="pageLogin-form--input" suffix={<Icon type="lock" className="pageLogin-form--icon" />} type="password" placeholder="请输入密码" />
                  )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox>记住密码</Checkbox>
                  )}
                <a className="login-form-forgot" href="javascript:;">忘记密码</a>
              </FormItem>
              <FormItem>
                <Button type="primary" size="large" htmlType="submit" className="login-form-button pageLogin-form--submit">
                  登录
                </Button>
              </FormItem>
              <FormItem>
                <a className="login-form-forgot" href="javascript:;">立即注册</a>
              </FormItem>
            </Form>
          </div>
        </main>
      </div>
    )
  }
}

export default Form.create()(Login);