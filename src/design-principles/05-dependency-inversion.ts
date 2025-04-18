// --------------------------------------COMPLIANT CODE---------------------------
// Low Level Module
class MySqlDatabase {
  save(data: string): void {
    console.log(`Saving ${data} to MySQL database`);
  }
}

class _HighLevelModule {
  constructor(private database: MySqlDatabase) {}

  execute(data: string) {
    this.database.save(data);
  }
}

const mysql = new MySqlDatabase();
const highLvl = new _HighLevelModule(mysql);

highLvl.execute("Compliant Code");

// ----------------------------------------------------------------------------------------

/**
 * NON COMPLIANT CODE - Dependency Inversion Principle
 *
 * The high level module must not depend on low level modules directly. Instead
 * they should depend on abstractions (interfaces / abstract classes).
 *
 * Abstractions shouldn't depend on details (underlying implementation),
 * instead underlying implementation should be dependent on abstractions.
 * Low Level Modules must implement contract declared by interfaces / abstract classes.
 */
interface IDatabase {
  save(data: string): void;
}

// Low Level Modules
class PostgresDatabase implements IDatabase {
  save(data: string): void {
    console.log(`Saving ${data} to PostgreSQL database`);
  }
}

class MongoDatabase implements IDatabase {
  save(data: string): void {
    console.log(`Saving ${data} to Mongo database`);
  }
}

class RedisDatabase implements IDatabase {
  save(data: string): void {
    console.log(`Saving ${data} to Redis database`);
  }
}

class HighLevelModule {
  constructor(private database: IDatabase) {}

  execute(data: string) {
    this.database.save(data);
  }
}

const pg = new PostgresDatabase();
const redis = new RedisDatabase();
const mongo = new MongoDatabase();

const user = new HighLevelModule(mongo);
const auth = new HighLevelModule(redis);
const post = new HighLevelModule(pg);

user.execute("User data");
auth.execute("Auth data");
post.execute("Post data");
