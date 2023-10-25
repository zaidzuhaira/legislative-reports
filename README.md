This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

Install the required dependencies with npm 

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the home page.

On the home page you should see files uploaders and the reports generators.

Upload all the necessary files and generate the required reports.

## Assignment Questions

Thank you for giving me the opportunity to complete this assignment. I appreciate that you chose a realistic task instead of the usual algorithm-based tasks given by most companies. Even if we don’t proceed further, I enjoyed working on this assignment and would like to thank everyone involved in making it.

Responses

1. Discuss your solution’s time complexity. What tradeoffs did you make?
I have created a user-friendly full-stack web application using Next.js framework, consisting of an API and file uploader without storing static files within the application. Although a simple script can accomplish the same job, my intention was to create an efficient end-user product with better functionality and performance.

In the application, the user visits the home page and uploads files for processing. Upon clicking "generate reports," the files are sent to the endpoint for processing. The calculation takes place at runtime, and the outputted CSV is returned as a downloadable file. Regarding time complexity, my application has a worst-case time complexity of O(n). I believe I have made the right tradeoffs, balancing functionality and performance.

2. How would you change your solution to account for future columns that might be requested, such as “Bill Voted On Date” or “Co-Sponsors”?
If new columns were added to the dataset, I would modify the API to process these columns through a new function or modify the existing one. Additionally, I would add the new column names to the backend functions responsible for rendering the CSV files.

3. How would you change your solution if instead of receiving CSVs of data, you were given a list of legislators or bills that you should generate a CSV for?
In such a scenario, I would use the existing helper function that generates a CSV file from JSON. I would modify the application to accept a list of legislators or bills as input from the user, convert them to JSON format, and utilize the same function to generate the required CSV files.

4. How long did you spend working on the assignment?
I spent approximately three hours working on this assignment. The majority of the time was spent creating the file upload functionality while endpoint creation took less than an hour.
