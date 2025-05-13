import requests

# Step 1: Obtain a token
token_response = requests.post("http://54.169.81.75:8000/api/token/", data={
    "username": "21449723",
    "password": "Unihub+Capstone"
})
token_data = token_response.json()
access_token = token_data.get("access")

if not access_token:
    print("Failed to obtain access token")
else:
    # Step 2: Access the feedback view
    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }
    feedback_data = {
        "name": "New User",
        "role": "Participant",
        "like": "everything",
        "dislike": "nothing",
        "satisfaction": "Satisfied",
        "experience": "Great event!"
    }
    feedback_response = requests.post("http://localhost:8000/feedback/", headers=headers, json=feedback_data)
    print(feedback_response.status_code)
    print(feedback_response.json())