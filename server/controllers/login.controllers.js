import signIn from '../models/signin.models.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is Required!' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Password is Required!' });
    }

    try {

        const user = await signIn.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found!' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid Credentials' });
        }


        return res.status(200).json({ message: 'Logged in successfully', user });


    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Something went wrong!' });
    }
};
