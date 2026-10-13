
const { test: base } = require("@playwright/test");

exports.customTest = base.extend({
    testDataCustom: async ({}, use) => {
        await use({
            productName: "ADIDAS ORIGINAL",
            email: "yadrajshinde97@gmail.com",
            password: "Yadgodtes@123456",
        });
    },
});
