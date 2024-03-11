import Contracts from 'App/Models/Projects';

export default class UserService {
    public static async getContracts(userId) {
        const contracts = await Contracts.query()
            .where('user_id', userId)
            .whereNull('deleted_at')

        return contracts;
    }
}
