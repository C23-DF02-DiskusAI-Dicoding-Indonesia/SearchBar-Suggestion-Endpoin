# Base image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy requirements.txt file
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the remaining files
COPY . .

# Run the application
CMD [ "python", "app.py" ]
