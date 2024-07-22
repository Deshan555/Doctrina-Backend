const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const Rules = require('../models/ruleModel');

router.post('/define/rule', async (req, res) => {
    const { projectName, sectionName, ruleName, ruleDescription, ruleType, ruleDefination, ruleStatus } = req.body;
    try {
        let rule = await Rules.findOne({
            ruleName
        });
        if (rule) {
            return res.status(400).json({
                errors: [{
                    msg: 'Rule already exists'
                }]
            });
        }
        rule = new Rules({
            _id: randomUUID(),
            projectName,
            sectionName,
            ruleName,
            ruleDescription,
            ruleType,
            ruleDefination,
            ruleStatus
        });
        await rule.save();
        res.send('Rule defined');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// hello world endpoint
router.get('/hello', (req, res) => {
    res.send('Hello World!');
});


module.exports = router;
