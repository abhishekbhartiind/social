import AppDataSource from "./AppDataSource"

const main = async () => {
    await AppDataSource.initialize();
}

main();