class UrlContoller {
    constructor(service){
        this.service = service ;
    }

    create = (req , res) => {
         const { long_url } = req.body;

        if (!long_url) {
            return res.status(400).json({ error: "long_url required" });
        }

        // Generate unique short code using Base62 encoding
        const shortCode = this.service.createShortUrl(long_url);

        // Dynamically construct base URL
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        return res.status(201).json({
            short_code: shortCode,
            short_url: `${baseUrl}/${shortCode}`
        });
    }


    redirect = (req, res) => {
        const { code } = req.params;

        if (!this.service.exists(code)) {
        return res.status(404).send("Not Found");
        }

        const longUrl = this.service.getLongUrl(code);
        return res.redirect(longUrl);
    };

    getInfo = (req, res) => {
        const { code } = req.params;

        if (!this.service.exists(code)) {
        return res.status(404).send("Not Found");
        }

        return res.json({
        short_code: code,
        long_url: this.service.getLongUrl(code)
        });
    };
}

module.exports = UrlContoller;