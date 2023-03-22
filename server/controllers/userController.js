const User = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (user.password !== password)
      return res.json({ msg: "Incorrect Username or Password", status: false });
    delete user.password;
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  console.log("user data req");
  const { name, email, phone_number, ip, location, lang, langs, platform, userAgent } = req.body;
  const UserCheck = await User.find({ phone_number });
  const time_value = Date.now();
  const time = new Date(time_value);

  if (UserCheck.length > 0) {
    let user = UserCheck[0];
    console.log(user)
    if (user.name !== name) {
      user.names.push({ name: user.name, change_time: time })
      user.name = name
    }

    if (user.email !== email) {
      user.emails.push({ email: user.email, change_time: time })
      user.email = email
    }

    if (user.ip !== ip) {
      user.ip_list.push({ ip: old_ip, change_time: time })
      user.ip = ip
    }

    if (user.location.latitude !== location.latitude && user.location.longitude !== location.longitude) {
      user.location_list.push({ location: user.location, change_time: time })
      user.location = location
    }

    User.findByIdAndUpdate(user._id, {
      name: user.name,
      names: user.names,
      email: user.email,
      emails: user.emails,
      ip: user.ip,
      ip_list: user.ip_list,
      location: user.location,
      location_list: user.location_list
    }).then(data => {

      return res.json({ status: true, user: data });
    })
      .catch(err =>{
        console.log(err);

        return res.json({status:false});
      });



  } else {
    const newUser = await User.create({
      name: name,
      email: email,
      phone_number: phone_number,
      status: {
        status_name: "user",
        delivery_time: time
      },
      ip: ip,
      location: location,
      lang: lang,
      langs: langs,
      platform: platform,
      agent: userAgent,
      login_time: time,
    })
      .then(data => {
        return res.json({ status: true, user: data });
      })
      .catch(err =>{
        console.log(err);

        return res.json({status:false});
      });
  }
};



module.exports.getAllUsers = async (req, res, next) => {
  try {
    console.log(req.params)
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "name",
      "phone_number",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

module.exports.logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
