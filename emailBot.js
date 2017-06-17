/*
 *   Date: 2017-06-17
 *   Author:wangning
 */
const Imap = require('imap')
const inspect = require('util').inspect
const MailParser = require('mailparser').MailParser
const Wechaty = require('wechaty').Wechaty


var binding_flag = true     //a true flag means you have connect your email successfully
var flag = false            //a false flag means you don't want to receive a latest email on the beginning

//please enter your email address and password
var email_address = 'xxx@xxx.com'
var email_password = 'xxxxxx'
var imap = checkMail(email_address, email_password)

// Wechaty
const bot = Wechaty.instance() 
bot
    .on('scan', (url, code) => console.log(`Scan QR Code to login: ${code}\n${url}`))
    .on('login', user => {
        console.log(`User ${user} logined`)

        if (binding_flag)
            Wechaty.instance().say( user + "您好～绑定邮箱" + email_address + "成功！")
        else
            Wechaty.instance().say( user + "您好～绑定邮箱" + email_address + "失败，请重试！")
    })
    .init()

function openInbox(cb) {
    imap.openBox('INBOX', true, cb)
}

imap.once('ready', function () {
    console.log("connected!")
    openInbox(function (err, box) {
        if (err) throw err
    })
})
imap.on('mail', function () {
    if (flag) {
        openInbox(function (err, box) {
            if (err) throw err;
            var f = imap.seq.fetch(box.messages.total + ':*', {
                bodies: '',
                struct: true
            })
            f.on('message', function (msg, seqno) {
                fetchMessage(msg, seqno)
            })
            f.once('error', function (err) {
                self.emit('error', err)
            })
        })
    }
    else
        flag = true
})

imap.once('error', function (err) {
    binding_flag = false
    console.log(err)
})

imap.once('end', function () {
    console.log('Connection ended')
})

imap.connect()

// get new email info
function fetchMessage(msg, seqno) {
    console.log(seqno) // email sequence number
    var mailparser = new MailParser()
    msg.on('body', function (stream, info) {
        stream.pipe(mailparser)
    });
    mailparser.on("end", function (mail) {
        console.log("text: " + mail.text)
        console.log("from: " + mail.headers.from)
        console.log("subject: " + mail.headers.subject)
        str = "您收到了一封来自" + mail.headers.from + "的邮件，主题是：" + mail.headers.subject + "，正文内容如下:" + mail.text
        bot.say(str)
    });
}

// select email type automaticly
function checkMail(email_address,email_password) {
    var email_host = ''
    var address_type = email_address.split("@")[1]

    if(address_type.indexOf("qq") >= 0)
        email_host = 'imap.qq.com'
    else if(address_type.indexOf("gmail") >= 0)
        email_host = 'imap.gmail.com'
    else if(address_type.indexOf("outlook") >= 0)
        email_host = 'imap-mail.outlook.com'
    else if(address_type.indexOf("163") >= 0)
        email_host = 'imap.163.com'
    else if(address_type.indexOf("126") >= 0)
        email_host = 'imap.126.com'
    else if(address_type.indexOf("sina") >= 0)
        email_host = 'imap.sina.com'
    return new Imap({
        user: email_address,
        password: email_password,
        host: email_host ,
        port: 993,
        tls: true
    })
}
