import User from 'App/Models/Users';

export default class UserService {
  public static async accessLevel(userId: number) {
    const user = await User.query().where('id', userId).first();
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }
    return user.id_profile;
  }

  public static async userSettings(userId: number) {
    const user = await User.query().where('id', userId).first();
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    return {
      name: user.name,
      email: user.email,
      id: user.id,
      id_profile: user.id_profile
    };
  }

  public static async editUserSettings(userId: number, newName: string, newEmail: string) {
    const user = await User.findOrFail(userId);

    user.name = newName;
    user.email = newEmail;
    await user.save();

    return user;
  }
}
