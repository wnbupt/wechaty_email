# Wechaty-Mail

[![wechaty-logo](https://raw.githubusercontent.com/chatie/wechaty/master/image/wechaty-logo-en.png)](https://github.com/chatie/wechaty)

Wechaty-Mail is an application based on Wechaty which can help you get notifications in WeChat when you receive new emails.
# We Support
  - Gmail
  - Outlook
  - 163，126（Netease mails）
  - QQ mail
  - Sina mail
# Get Started
  - Please read this [guide](https://github.com/chatie/wechaty#getting-started)
  - Make sure your environment configuration is OK
  - Run Wechaty successfully :)

# Email Settings
In order to receive mail in WeChat successfully, we need to authorize the mailbox and turn on the **IMAP** service.

#### Gmail/Outlook/Sina
  - Log in your mailbox
  - Find **setting about IMAP/POP3/SMTP** and **turn on the IMAP service**
#### 163/126 Mail
  - Log in your mailbox
  - Find **setting about IMAP/POP3/SMTP**  and **turn on the IMAP service**
  - Set and remember your new authorization password
  - Enter http://config.mail.163.com/settings/imap/login.jsp?uid=xx@xx.com(xx@xx.com is your own netease email address) and do as it says
   [![wechaty-logo](https://cdn.sspai.com/2017/03/20/27ab458be8e618ad620d0367ccd5e08f.png?imageMogr2/quality/90/thumbnail/700x)](https://sspai.com/post/38325)
#### QQ Mail
  - Log in your mailbox
  - Find **setting about IMAP/POP3/SMTP**  and **turn on the IMAP service**
  - Set and remember your new authorization password

# Run
#### Input your own email address and password
**Notice** : when use 163/126/QQ mail,you should input **authorization code** as password instead of your login password


Take Gmail as an example
```
var email_address = 'xxx@gmail.com'
var email_password = 'xxxxxxxxx'
var imap = new Imap({
    user: email_address,
    password: email_password,
    host: 'imap.gmail.com',
    port: 993,
    tls: true
})
```
| Email Type | Imap Address | port |
| ------ | ------ | ------ |
| Gmail | imap.gmail.com | 993 |
| Outlook | imap-mail.outlook.com | 993 |
| QQ | imap.qq.com | 993 |
| 163 | imap.163.com | 993 |
| 126 | imap.126.com | 993 |
| sina | imap.sina.com | 993 |
#### Run and see new email notifications in WeChat filehelper

License
----

MIT
