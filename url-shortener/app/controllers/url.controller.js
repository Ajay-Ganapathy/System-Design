class UrlContoller {
    constructor(service){
        this.service = service ;
    }

    create = async (req , res) => {
         const { long_url } = req.body;

        if (!long_url) {
            return res.status(400).json({ error: "long_url required" });
        }

        // Generate unique short code using Base62 encoding
        const shortCode = await this.service.createShortUrl(long_url);

        // Dynamically construct base URL
        const baseUrl = `${req.protocol}://${req.get("host")}`;

        return res.status(201).json({
            short_code: shortCode,
            short_url: `${baseUrl}/${shortCode}`
        });
    }


    redirect = async (req, res) => {
        const { code } = req.params;

        if (!this.service.exists(code)) {
        return res.status(404).send("Not Found");
        }

        const longUrl = await this.service.getLongUrl(code);
        return res.redirect(longUrl);
    };

    getInfo = async (req, res) => {
        const { code } = req.params;

        if (!this.service.exists(code)) {
        return res.status(404).send("Not Found");
        }

        const long_url = await this.service.getLongUrl(code);

        return res.json({
        short_code: code,
        long_url: long_url
        });
    };
}

module.exports = UrlContoller;