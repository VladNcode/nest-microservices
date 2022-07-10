import { IUser, UserRole } from '@purple/interfaces';
import { compare, genSalt, hash } from 'bcryptjs';

export class UserEntity implements IUser {
	_id?: string;
	displayName?: string;
	email: string;
	passwordHash: string;
	role: UserRole;

	constructor(user: IUser) {
		this._id = user._id;
		this.passwordHash = user.passwordHash;
		this.displayName = user.displayName;
		this.email = user.email;
		this.role = user.role;
	}

	public async setPassword(password: string): Promise<this> {
		const salt = await genSalt(12);
		this.passwordHash = await hash(password, salt);
		return this;
	}

	public validatePassword(password: string): Promise<boolean> {
		return compare(password, this.passwordHash);
	}
}
