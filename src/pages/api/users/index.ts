import { getUsers } from '../../data/users';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(200).end();
  }

  const users = await getUsers();

  if (req.query.search) {
    const searchQuery = req.query.search.toLowerCase();
    const filteredUsers = users.filter((user) =>
      user.firstName.toLowerCase().includes(searchQuery)
    );
    const totalUsers = filteredUsers.length;
    const sumOfAges = filteredUsers.reduce((sum, user) => sum + user.age, 0);
    const averageAge = sumOfAges / totalUsers;

    return res.status(200).json({ users: filteredUsers, averageAge });
  }

  const totalUsers = users.length;
  const sumOfAges = users.reduce((sum, user) => sum + user.age, 0);
  const averageAge = sumOfAges / totalUsers;

  return res.status(200).json({ users, averageAge });
}
