import express, {} from "express";
const app = express();
const PORT = 9002;
app.get("/", (req, res) => {
    res.send("Typescript server is running.");
});
app.listen(PORT, () => {
    console.log(`Server is running at port: ${PORT}`);
});
//# sourceMappingURL=server.js.map