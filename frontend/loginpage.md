# How to Change the Login Page Image

To change the image displayed on the login page, follow these steps:

1. Open the file `components/SignIn.tsx`.
2. Locate the `<img>` tag inside the `SignIn` component's return statement. It currently looks like this:
   ```tsx
   <img 
       src="gs://cloud-ai-platform-ad607f0d-31f1-40e0-bf75-3b235388530c/login2.png" 
       alt="Your Vote. Our Progress. A Stronger India." 
       className="w-full h-auto object-cover"
   />
   ```
3. Replace the `src` attribute with the URL of your desired image.
   * **For an external image:** Paste the direct URL (e.g., `src="https://example.com/my-image.jpg"`).
   * **For a local image:** If you add an image to your project (e.g., in a `public` folder or imported directly), update the `src` to point to that local path.
4. (Optional) Update the `alt` attribute to accurately describe your new image for accessibility purposes.
5. Save the file. The login page will now display your new image.
