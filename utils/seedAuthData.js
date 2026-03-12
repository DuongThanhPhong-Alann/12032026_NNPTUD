let roleModel = require('../schemas/roles')
let userModel = require('../schemas/users')

module.exports = async function seedAuthData() {
    let adminRole = await roleModel.findOneAndUpdate(
        { name: 'admin' },
        {
            $set: { isDeleted: false },
            $setOnInsert: {
                name: 'admin',
                description: 'Administrator role'
            }
        },
        { upsert: true, returnDocument: 'after', runValidators: true }
    )

    let userRole = await roleModel.findOneAndUpdate(
        { name: 'user' },
        {
            $set: { isDeleted: false },
            $setOnInsert: {
                name: 'user',
                description: 'Standard user role'
            }
        },
        { upsert: true, returnDocument: 'after', runValidators: true }
    )

    await userModel.findOneAndUpdate(
        { username: 'admin' },
        {
            $set: { isDeleted: false },
            $setOnInsert: {
                username: 'admin',
                password: 'admin123',
                email: 'admin@nnptudm.local',
                fullName: 'Administrator',
                status: true,
                role: adminRole._id,
                loginCount: 0
            }
        },
        { upsert: true, returnDocument: 'after', runValidators: true }
    )

    await userModel.findOneAndUpdate(
        { username: 'user' },
        {
            $set: { isDeleted: false },
            $setOnInsert: {
                username: 'user',
                password: 'user123',
                email: 'user@nnptudm.local',
                fullName: 'User',
                status: true,
                role: userRole._id,
                loginCount: 0
            }
        },
        { upsert: true, returnDocument: 'after', runValidators: true }
    )
}
