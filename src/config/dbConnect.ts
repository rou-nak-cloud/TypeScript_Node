import mongoose from "mongoose";

const URI: string =
  "mongodb://githubrounak19_db_user:mangoissweet@ac-rypwflj-shard-00-00.b8swqn3.mongodb.net:27017,ac-rypwflj-shard-00-01.b8swqn3.mongodb.net:27017,ac-rypwflj-shard-00-02.b8swqn3.mongodb.net:27017/typeScript?ssl=true&replicaSet=atlas-1465qp-shard-0&authSource=admin&appName=Cluster0";

export async function dbConnect(): Promise<void> {
  try {
    await mongoose.connect(URI);
    console.log(`Database connected.`);
  } catch (error) {
    console.log(`Database not connected.`, error);
  }
}
