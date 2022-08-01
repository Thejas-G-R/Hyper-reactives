exports.ping = (req, res) => {
    console.log("Ping")
    return res.json({
        message: "ping"
    })
}