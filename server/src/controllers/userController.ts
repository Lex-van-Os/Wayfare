import * as userService from "../services/userService.ts";

async function getUsers(req: any, res: any) {
  try {
    const result = await userService.getUsers();

    if (result) {
      res.json(result);
    } else {
      console.log("Empty result");
      res.status(404).json({ error: "No users found" });
    }
  } catch (error) {
    console.error("Error retrieving all users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export { getUsers };
