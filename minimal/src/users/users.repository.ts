export interface User {
  id: string;
  name: string;
}

export class UsersRepository {
  private readonly users: User[] = [
    { id: "1", name: "Alice" },
    { id: "2", name: "Bob" },
  ];

  public async list(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }
}
