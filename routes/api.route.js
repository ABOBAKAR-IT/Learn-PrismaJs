const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});
router.get("/user", async (req, res, next) => {
  const users = await prisma.user.findMany({});
  res.send(users);
});

router.post("/create", async (req, res, next) => {
  const userData = req.body;
  const user = await prisma.user.create({
    data: {
      ...userData,
    },
  });
  res.send(user);
});

router.get("/getuser", async(req, res, next) => {
  const { id } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: Number(id),
    },
  });
  res.send(user);
});

router.put("/update", async (req, res, next) => {
  const { id } = req.body;
  const { name, email } = req.body;
  const user = await prisma.user.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
      email,
    },
  });
  res.send(user);
});

router.get("/delete", async(req, res, next) => {
  const { id } = req.body;
  console.log(id)
  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });
  res.send(user);
});

module.exports = router;
