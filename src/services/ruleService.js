const express = require('express');
const router = express.Router();
const { randomUUID } = require('crypto');
const Rules = require('../models/ruleModel');
const { errorResponse, successResponse } = require('../utils/response');
const logger = require('../config/logger');

router.post('/define/rule', async (req, res) => {
    const { projectName, sectionName, ruleName, ruleDescription, ruleType, ruleDefination, ruleStatus } = req.body;
    try {
        let rule = await Rules.findOne({
            ruleName
        });
        rule? errorResponse(res, 'Rule already exists', 400): null
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
        successResponse(res, 'Rule defined successfully', rule);
    } catch (err) {
        logger.error(err.message);
        errorResponse(res, 'Server Error', 500);
    }
});

router.get('/get/rules', async (req, res) => {
    try {
        const rules = await Rules.find();
        successResponse(res, 'Rules fetched successfully', rules);
    } catch (err) {
        logger.error(err.message);
        errorResponse(res, 'Server Error', 500);
    }
});

router.get('/get/rule/:id', async (req, res) => {
    try {
        const rule = await Rules.findById(req.params.id);
        rule? successResponse(res, 'Rule fetched successfully', rule): errorResponse(res, 'Rule not found', 400);
    } catch (err) {
        logger.error(err.message);
        errorResponse(res, 'Server Error', 500);
    }
});

// UPDATE SPECIFIC RULE BASED ON ID
router.put('/update/rule/:id', async (req, res) => {
    try {
        const{ projectName, sectionName, ruleName, ruleDescription, ruleType, ruleDefination, ruleStatus } = req.body;
        let rule = await Rules.findById(req.params.id);
        rule? null: errorResponse(res, 'Rule not found', 400);
        rule.projectName = projectName;
        rule.sectionName = sectionName;
        rule.ruleName = ruleName;
        rule.ruleDescription = ruleDescription;
        rule.ruleType = ruleType;
        rule.ruleDefination = ruleDefination;
        rule.ruleStatus = ruleStatus;
        await rule.save();
        successResponse(res, 'Rule updated successfully', rule);
    } catch (err) {
        logger.error(err.message);
        errorResponse(res, 'Server Error', 500);
    }
});

module.exports = router;
