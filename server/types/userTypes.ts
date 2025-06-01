export type User = {
    userId?: string,
    email: string,
    password?: string
    isAdmin?: boolean
    lockedAt?: Date | string | null
    createdAt?: Date | string
    modifiedAt?: Date | string
    deletedAt?: Date | string | null
}

export type UserProfile = {
    userId: string,
    firstName: string,
    lastName: string,
    bio?: string | null,
    headline?: string | null,
    profilePictureUrl?: string | null,
    interests: string[],
    createdAt?: Date | string,
    modifiedAt?: Date | string
}
