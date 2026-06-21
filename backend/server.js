import {app} from "./app.js"
import {PORT} from "./config/config.js"

const app = express()

app.listen(PORT, () => {
    console.log(
        `server started at http://localhost:${PORT}`
    )
})