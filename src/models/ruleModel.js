const mongoose = require('mongoose');

const RuleSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.UUID,
    projectName : {
        type: String,
        required: true
    },
    sectionName : {
        type: String,
        required: false
    },
    ruleName: {
        type: String,
        required: true
    },
    ruleDescription: {
        type: String,
        required: false
    },
    ruleType: {
        type: String,
        required: false
    },
    ruleDefination: {
        type: mongoose.Schema.Types.Mixed,
        required: true
    },
    ruleStatus: {
        type: Boolean,
        required: true
    },
    createdAt : {
        type: Date,
        default: Date.now
    }
});

module.exports = Rule = mongoose.model('executorsList', RuleSchema);