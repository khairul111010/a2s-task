import { Router } from 'express';
const router = Router();

router.get('/auth', (req, res) => {
    res.send('Get all users from API v1');
});

export default router;
