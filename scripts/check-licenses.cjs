const fs = require("fs");

const report = JSON.parse(
    fs.readFileSync("licenses.json", "utf8")
);

const config = JSON.parse(
    fs.readFileSync("config/allowed-licenses.json", "utf8")
);

const allowed = new Set(config.allowedLicenses);

let violations = [];

console.log("Checking dependency licenses...\n");

for (const [pkg, details] of Object.entries(report)) {

    let licenses = details.licenses;

    if (!Array.isArray(licenses)) {
        licenses = [licenses];
    }

    const invalid = licenses.filter(
        license => !allowed.has(license)
    );

    if (invalid.length > 0) {
        violations.push({
            package: pkg,
            licenses: invalid
        });
    }
}

if (violations.length > 0) {

    console.error("\nLicense Policy Violations\n");

    violations.forEach(v => {
        console.error(
            `${v.package} -> ${v.licenses.join(", ")}`
        );
    });

    process.exit(1);
}

console.log("All dependency licenses comply with policy.");