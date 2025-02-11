// Benchmark function
export async function runBenchmark(fn) {
    try {
        const results = await benchmark(fn);
        return {
            success: true,
            results: formatBenchmarkResults(results)
        };
    } catch (error) {
        return {
            success: false,
            error: `Benchmark Error: ${error.message}`
        };
    }
}

// Benchmark implementation
async function benchmark(fn, iterations = 1000) {
    const results = {
        iterations,
        totalTime: 0,
        averageTime: 0,
        fastest: Infinity,
        slowest: 0
    };

    // Warm up
    await fn();

    for (let i = 0; i < iterations; i++) {
        const start = performance.now();
        await fn();
        const end = performance.now();
        const duration = end - start;

        results.totalTime += duration;
        results.fastest = Math.min(results.fastest, duration);
        results.slowest = Math.max(results.slowest, duration);
    }

    results.averageTime = results.totalTime / iterations;
    return results;
}

// Format benchmark results
function formatBenchmarkResults(results) {
    return `Benchmark Results:
• Total Iterations: ${results.iterations}
• Total Time: ${results.totalTime.toFixed(2)}ms
• Average Time: ${results.averageTime.toFixed(2)}ms
• Fastest Run: ${results.fastest.toFixed(2)}ms
• Slowest Run: ${results.slowest.toFixed(2)}ms`;
}
