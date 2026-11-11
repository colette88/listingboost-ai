import { z } from 'zod';
export const licenseInput = z.string().trim().min(5).max(200);
export async function validateLicense(key:string) {
 if(!process.env.LEMON_SQUEEZY_STORE_ID || !process.env.LEMON_SQUEEZY_PRODUCT_ID) throw new Error('License verification is not configured yet.');
 const response=await fetch('https://api.lemonsqueezy.com/v1/licenses/validate',{method:'POST',headers:{Accept:'application/json','Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({license_key:key}),signal:AbortSignal.timeout(15000),cache:'no-store'});
 if(!response.ok) throw new Error('License service is unavailable. Please try again.');
 const data=await response.json();
 return data.valid===true && ['active','inactive'].includes(data.license_key?.status) && String(data.meta?.store_id)===process.env.LEMON_SQUEEZY_STORE_ID && String(data.meta?.product_id)===process.env.LEMON_SQUEEZY_PRODUCT_ID;
}
