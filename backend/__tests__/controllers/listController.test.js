// const request = require("supertest");
// const app = require("../../index"); 


// const sequelize = new Sequelize({
//     dialect: "sqlite",
//     storage: ":memory:", 
//   });

// const { User, List } = require("../../models"); 

// beforeAll(async () => {
  
//   await sequelize.sync({ force: true }); 
// });

// afterAll(async () => {
//   await sequelize.close(); 
// });

// describe("POST /addToList", () => {
//   it("devrait ajouter une œuvre à une liste", async () => {
   
//     const user = await User.create({
//       name: "Test User",
//       email: "testuser@example.com",
//       password: "testpassword", 
//     });

//     const data = {
//       userId: user.id,
//       workId: 123,
//       type: "watchlist", 
//       workType: "film",
//     };

//     const response = await request(app)
//       .post("/api/lists/addToList") 
//       .send(data);

//     expect(response.status).toBe(201);
//     expect(response.body.message).toContain("ajouté à la liste");
//     expect(response.body.data).toHaveProperty("userId", user.id);
//     expect(response.body.data).toHaveProperty("workId", 123);
//   });

//   it("devrait renvoyer une erreur si l'utilisateur n'existe pas", async () => {
//     const data = {
//       userId: 99999, 
//       workId: 123,
//       type: "watchlist",
//       workType: "film",
//     };

//     const response = await request(app)
//       .post("/api/lists/addToList")
//       .send(data);

//     expect(response.status).toBe(404);
//     expect(response.body.message).toBe("Utilisateur non trouvé.");
//   });

//   it("devrait renvoyer une erreur si l'œuvre est déjà dans la liste", async () => {
   
//     const user = await User.create({
//       name: "Test User",
//       email: "testuser@example.com",
//       password: "testpassword",
//     });

//     const data = {
//       userId: user.id,
//       workId: 123,
//       type: "watchlist",
//       workType: "film",
//     };

//     await List.create(data);

//     const response = await request(app)
//       .post("/api/lists/addToList")
//       .send(data);

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe("Cette œuvre est déjà dans la liste.");
//   });

//   it("devrait renvoyer une erreur si des champs sont manquants", async () => {
//     const data = {
//       userId: 1, 
//       workId: 123,
//     };

//     const response = await request(app)
//       .post("/api/lists/addToList")
//       .send(data);

//     expect(response.status).toBe(400);
//     expect(response.body.message).toBe(
//       "Les champs userId, workId, type et workType sont obligatoires."
//     );
//   });
// });
