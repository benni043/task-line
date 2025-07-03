import { createDatabase } from "db0";
import libSql from "db0/connectors/libsql/node";
import db0Driver from "unstorage/drivers/db0";

export default defineNitroPlugin(() => {
  const storage = useStorage();
  const config = useRuntimeConfig();

  const database = createDatabase(
    libSql({
      url: config.libsqlUrl,
      authToken: config.libsqlAuth,
    }),
  );

  storage.mount(
    "todos",
    db0Driver({
      database: database,
      tableName: "todos",
    }),
  );
  storage.mount(
    "tags",
    db0Driver({
      database: database,
      tableName: "tags",
    }),
  );
  storage.mount(
    "categories",
    db0Driver({
      database: database,
      tableName: "categories",
    }),
  );
});
