
London Power Summit

# LAB: HOW TO CREATE A HUMAN RESOURCES AGENT IN COPILOT STUDIO STEP BY STEP

This is a repository that stores Excel tables, and a step by step guide to create a Human Resources Agent with Copilot Studio.

  1. Sign in [Power Apps](https://make.powerapps.com/) with your user and password
    
![1](https://github.com/user-attachments/assets/e33f01ad-f0b1-4e5f-ae41-8f52293ea622)

  1.1. Choose the Power Summit environment

![1-1](https://github.com/user-attachments/assets/31431ec0-fd95-450f-a881-9cd8cad2faa6)

  2.  Create a solution named HR Agent + *your name in brackets* and a publisher for the solution with your own parameters

![2](https://github.com/user-attachments/assets/5325ce17-b397-4c86-8df2-d28ce5b450dc)

  2.1. Write your name on the Display name, Name and Prefix

![2-1](https://github.com/user-attachments/assets/9c2a77b5-36b5-439f-96d6-a1bbac351805)

  3. Create a new table in the HR solution

![3](https://github.com/user-attachments/assets/1d594ad4-5025-4ef5-a389-8efe2717be8e)

  4. Import Employees excel file 

![4](https://github.com/user-attachments/assets/525aa811-d1ee-4528-bdc3-91899fb0d628)

![4-1](https://github.com/user-attachments/assets/f123dcde-a678-42ba-9b2d-9355d984cc3e)

![4-2](https://github.com/user-attachments/assets/3bbe19f1-3ef1-4dd6-a5d4-923534938ce4)

  4.1. And then, do the same steps to import the Projects excel file until you get both

![4-3](https://github.com/user-attachments/assets/35cd4c34-f567-4d2a-9412-f8baa95c0692)

  5. Create a new table with the advanced properties called Holiday requests

![5](https://github.com/user-attachments/assets/482a7875-72d4-4ed7-8629-0bac8828376d)

![5-1](https://github.com/user-attachments/assets/52349919-8983-4ddc-b433-310bd82c85cc)

  5.1. Once created, we will add:

- 2 date columns (start date and end date)

- 2 text columns (reason and comments)

- 1 number column (Days count)

- 1 choice column (Status)

- 1 lookup column (Employee)

![5-2](https://github.com/user-attachments/assets/8c0ea40c-2a11-4e99-b0d0-a0f17112f748)

following this steps:

- Write the display name

- select the data type

- select some other options if needed

![5 - 3](https://github.com/user-attachments/assets/aaff61e9-3101-40fb-a360-a93886e59699)

![5 - 4](https://github.com/user-attachments/assets/dd020ba1-b0cb-4406-ba17-7203afca4b62)

![5 - 5](https://github.com/user-attachments/assets/376e396f-dc04-4054-8000-ff2adb6007c7)

And now, we have our three tables ready

![5](https://github.com/user-attachments/assets/115f6a90-4d1b-425e-a73d-f4d6f78cefb4)

  6. Create a new agent in the HR solution

![6](https://github.com/user-attachments/assets/7ce8eca3-8e4f-44f0-ad9a-0a18a80c5686)

  7. Skip the copilot help to configure it manually
     
![7](https://github.com/user-attachments/assets/fc169b25-a41c-4020-aa0e-0ae3c58288e1)

  8. Change the name of the agent, you can change the icon also, add a description if you want to and write some instructions to let the agent know what do it has or doesn't have to do such as:

     PII Redaction: Automatically replace sensitive data, such as birth year, social insurance number, and postal code, with `[REDACTED]`.
     
     Professional Tone: Use a warm, respectful, and empathetic tone in all responses.
     
     No Profanity: Eliminate any profanity, slurs, or offensive language from both inputs and outputs.
     
     Clarity & Transparency: Ask clarifying questions when needed and briefly explain redactions due to privacy protocols.
     
     Compliance: Adhere to HR policies, data protection standards, and legal requirements consistently.

![8](https://github.com/user-attachments/assets/6fb0c12e-2452-4534-8957-c632f9c3c55c)

  9. Once created, we are going to add some knowledge sources to our agent

![9](https://github.com/user-attachments/assets/7cde7cb4-5b75-43fb-b6fa-ef0b098ebde9)

The first one will be a non real Company policies document 

![9 - 1](https://github.com/user-attachments/assets/3cf86495-d6d5-4746-b0bd-e6be4b1ceea9)

And the second knowledge source will be Dataverse

![9 - 2](https://github.com/user-attachments/assets/a4f6c468-befb-435f-aa49-815b2832f9d6)

We have to look for our tables (with our name on it) and add teh 3 of them at the same time

![9 - 3](https://github.com/user-attachments/assets/2a556b7e-b590-4d4f-acf1-e5b6f48dc712)




