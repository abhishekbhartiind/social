import { dataManager } from "../AppDataSource";

export const paginatedQuery = (
    limit: number, 
    maxCountPerQuery: number,
    tableName: string,
    order: 'DESC' | 'ASC',
    cursor?: string, 
) => {
    const realLimit = Math.min(maxCountPerQuery, limit);
    const paginatedLimit = realLimit + 1;

    const replacements: any[] = [paginatedLimit];

    if (cursor) {
        replacements.push(new Date(parseInt(cursor)));
    }

    return dataManager.query(
        `
            SELECT o.* 
            FROM ${tableName} o
            ${cursor ? `where o."createdAt" < $2` : ""}
            order by o."createdAt" ${order}
            limit $1
        `,
        replacements
    );
};
