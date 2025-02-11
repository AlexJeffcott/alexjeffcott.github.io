// Test runner function
export async function runTestSuite(testFn) {
    try {
        const results = await testRunner(testFn);
        return {
            success: true,
            results: formatTestResults(results),
            passed: results.failed === 0
        };
    } catch (error) {
        return {
            success: false,
            error: `Test Error: ${error.message}`
        };
    }
}

// Test runner implementation
async function testRunner(testFn) {
    const results = {
        passed: 0,
        failed: 0,
        total: 0,
        details: []
    };

    // Mock Deno.test functionality
    globalThis.Deno = {
        test: async (name, fn) => {
            try {
                await fn();
                results.passed++;
                results.details.push({ name, status: 'passed' });
            } catch (error) {
                results.failed++;
                results.details.push({ 
                    name, 
                    status: 'failed',
                    error: error.message 
                });
            }
            results.total++;
        }
    };

    await testFn();
    delete globalThis.Deno;
    
    return results;
}

// Format test results
function formatTestResults(results) {
    let output = `Test Results:
• Total Tests: ${results.total}
• Passed: ${results.passed}
• Failed: ${results.failed}\n\nDetailed Results:`;

    results.details.forEach(test => {
        output += `\n• ${test.name}: ${test.status}`;
        if (test.error) {
            output += `\n  Error: ${test.error}`;
        }
    });

    return output;
}
