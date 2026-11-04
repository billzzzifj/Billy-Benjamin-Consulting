async function check() {
  try {
    const res = await fetch('https://api.github.com/repos/billzzzifj/Billy-Benjamin-Consulting/deployments?per_page=3');
    const deployments = await res.json();
    if (!Array.isArray(deployments) || deployments.length === 0) {
      console.log('No deployments found');
      return;
    }
    const latest = deployments[0];
    console.log(`Latest Deployment ID: ${latest.id}, Ref: ${latest.ref}, Sha: ${latest.sha?.slice(0, 7)}, Created: ${latest.created_at}`);
    
    const statusRes = await fetch(`https://api.github.com/repos/billzzzifj/Billy-Benjamin-Consulting/deployments/${latest.id}/statuses`);
    const statuses = await statusRes.json();
    console.log(`State: ${statuses[0]?.state || 'unknown'}, Description: ${statuses[0]?.description || 'none'}`);
  } catch (err) {
    console.error(err.message);
  }
}
check();
