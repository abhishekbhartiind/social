import AppDataSource from "./AppDataSource"
import express from "express";


const main = async () => {
    await AppDataSource.initialize();

    const app = express();

    app.listen(4040, () => {
        console.log('Server is up at Port: 4040');
    })
}

main();