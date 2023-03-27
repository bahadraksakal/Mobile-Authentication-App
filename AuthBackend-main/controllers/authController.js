const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const { secureKey, NMmail, NMpassword } = require('../app.config');
var transporter = nodemailer.createTransport({
    service: 'outlook',
    auth: {
        user: NMmail,
        pass: NMpassword
    }
});

exports.createUser = async (req, res) => {
    try {
        console.log(req.body);
        //Kullanıcının zaten var olup olmadığını kontrol edin
        const userExist = await User.findOne({ userMail: req.body.userMail })
        if (userExist) {
            res.send({
                "baslik": "Başarısız!",
                "mesaj": `Kullanıcı, ${userExist.userMail} adresi ile zaten var!`
            });
            return;
        }
        const user = await User.create(req.body);
        res.status(201).json({
            "baslik": "Başarılı!", "mesaj": 'Kullanıcı başarıyla oluşturuldu!',
            "user": {
                "userName": user.userName,
                "userMail": user.userMail
            }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "baslik": "Hata!",
            "mesaj": "Sunucu hatası"
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.findOne({ userMail: req.body.userMail });
        if (user) {
            const cmp = await bcrypt.compare(req.body.userPassword, user.userPassword);
            if (cmp) {
                const token = jwt.sign({
                    userMail: user.userMail
                }, secureKey, { expiresIn: '1h' })
                res.send({
                    "mesaj": "Auth Success",
                    "token": token,
                    "user": {
                        "userName": user.userName,
                        "userMail": user.userMail
                    }
                });
            } else {
                res.send({ "baslik": "Başarısız", "mesaj": "Yanlış e-posta veya şifre" });
            }
        } else {
            res.send({ "baslik": "Başarısız", "mesaj": "Yanlış e-posta veya şifre" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "baslik": "Hata!",
            "mesaj": "Sunucu hatası"
        });
    }
};

exports.resetPass = async (req, res) => {
    try {
        const user = await User.findOne({ userMail: req.body.userMail });
        if (user) {
            let randomPassword = Math.random().toString(36).slice(-8);
            let un = user.userName;
            user.userPassword = randomPassword;
            console.log(randomPassword);
            await user.save(function (err) {
                if (err)
                    console.log(err + "");
            });
            var mailOptions = {
                from: NMmail,
                to: user.userMail,
                subject: 'Yeni Şifren | BTU Auth Team',
                html: `<h1> Merhaba ${un}. Şifren başarıyla sıfırlandı! </h1><br>Yeni şifren: ${randomPassword}<br>Yeni şifren ile giriş yapabilirsin!<br><br><b>BTU Auth Team</b>`
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
            res.send({
                "baslik": "Başarılı!",
                "mesaj": `Şifre sıfırlama işlemine devam etmek için lütfen ${user.userMail} adresini kontrol edin.`
            });
        } else {
            res.send({
                "baslik": "Başarısız!",
                "mesaj": "Kayıtlı mail yok."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            "baslik": "Hata!",
            "mesaj": "Sunucu hatası"
        });
    }

}

/*
change Password
gelecek veri
HEADER->
    KEY: "Authorization"
    VALUE: "Bearer JWToken"
-<

BODY->{
    userMail:"test1@test.com",
    userPassword:"1234",
    userNewPassword:"12345"
}
*/
exports.changePassword = async (req, res) => {
    try {
        const user = await User.findOne({ userMail: req.userData.userMail });
        console.log(req.userData);
        const cmp = await bcrypt.compare(req.body.userPassword, user.userPassword);
        console.log(cmp);
        if (cmp) {
            user.userPassword = req.body.userNewPassword;
            await user.save(function (err) {
                if (err)
                    console.log(err + "");
            });
            res.send({ "baslik": "Başarılı", "mesaj": "Şifre başarıyla değiştirildi" })
        } else {
            res.send({ "baslik": "Başarısız", "mesaj": "Mevcut şifreniz doğrulanamadı." });
        }

    } catch (error) {
        console.log("changePass catch" + error);
        res.send({ "baslik": "Hata", "mesaj": "Sistem sorunu. Durumu sistem yöneticisine bildirin" });
    }

}

/* 
Bu JWToken testi için yazılmış bir fonksiyon.
*/
exports.test = async (req, res) => {
    res.status(201).send({ message: req.userData.userMail + " - AuthComplate" })
}