// Verification script to check which Sanity project is deployed
import https from 'https';

const EXPECTED_PROJECT_ID = 'f0qk7p9q';
const DEPLOYED_URL = 'https://breizaas-website.vercel.app';

console.log('🔍 Verifying Sanity Project Configuration...\n');

// Method 1: Check the Studio page
console.log('Method 1: Checking Studio configuration...');
https.get(`${DEPLOYED_URL}/studio`, (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const projectIdMatch = data.match(/projectId["\s:]+["']([a-z0-9]+)["']/i);
    if (projectIdMatch) {
      const foundId = projectIdMatch[1];
      console.log(`   Found Project ID: ${foundId}`);
      console.log(`   Expected: ${EXPECTED_PROJECT_ID}`);
      console.log(`   Status: ${foundId === EXPECTED_PROJECT_ID ? '✅ CORRECT' : '❌ WRONG'}\n`);
    } else {
      console.log('   ⚠️  Could not extract project ID from Studio page\n');
    }
  });
}).on('error', (err) => {
  console.error('   ❌ Error fetching Studio page:', err.message);
});

// Method 2: Check environment config in the page source
setTimeout(() => {
  console.log('Method 2: Checking page source for NEXT_PUBLIC vars...');
  https.get(DEPLOYED_URL, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      // Look for the env config in Next.js script tags
      const envMatch = data.match(/NEXT_PUBLIC_SANITY_PROJECT_ID["\s:]+["']([a-z0-9]+)["']/i);
      if (envMatch) {
        const foundId = envMatch[1];
        console.log(`   Found Project ID: ${foundId}`);
        console.log(`   Expected: ${EXPECTED_PROJECT_ID}`);
        console.log(`   Status: ${foundId === EXPECTED_PROJECT_ID ? '✅ CORRECT' : '❌ WRONG'}\n`);
      } else {
        console.log('   ⚠️  Could not find NEXT_PUBLIC_SANITY_PROJECT_ID in page source\n');
      }

      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('✅ Verification Complete!');
      console.log(`Expected Sanity Project: ${EXPECTED_PROJECT_ID}`);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    });
  }).on('error', (err) => {
    console.error('   ❌ Error fetching homepage:', err.message);
  });
}, 1000);
