export function userDto(user) {
    if (!user) return null

    return {
        id: user.id,
        email: user.email,
        createdAt: user.created_at
    }
}