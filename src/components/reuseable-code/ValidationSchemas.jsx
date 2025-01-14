import * as Yup from "yup";

// Validation schema for login page
export const loginValidationSchema = () =>
  Yup.object().shape({
    // Email validation
    email: Yup.string()
      .required("Email is required.") // Email cannot be empty
      .email("Email must be a valid email address") // Must be a valid email format
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
        "Email must be a valid email address & ends with domain .com" // Custom regex to ensure email ends with .com domain
      )
      .test(
        "is-empty",
        "Email is required", // Custom test to ensure email is not just whitespace
        (value) => value && value.trim() !== "" // Checks if email has non-whitespace characters
      ),

    // Password validation
    password: Yup.string()
      .required("Password is required") // Password cannot be empty
      .min(6, "Password must have at least 6 characters") // Password must have at least 6 characters
      .test(
        "is-empty",
        "Password is required", // Custom test to ensure password is not just whitespace
        (value) => value && value.trim() !== "" // Checks if password has non-whitespace characters
      ),
  });

// Validation schema for user sign-up page
export const signUpValidationSchema = () =>
  Yup.object().shape({
    // Name validation
    name: Yup.string()
      .required("Name is required") // Name cannot be empty
      .min(3, "Name must be at least 3 characters") // Name must have at least 3 characters
      .test(
        "is-empty",
        "Name is required", // Custom test to ensure name is not just whitespace
        (value) => value && value.trim() !== "" // Checks if name has non-whitespace characters
      ),

    // Email validation (same as login)
    email: Yup.string()
      .required("Email is required.") // Email cannot be empty
      .email("Email must be a valid email address") // Must be a valid email format
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
        "Email must be a valid email address & ends with domain .com" // Custom regex to ensure email ends with .com domain
      )
      .test(
        "is-empty",
        "Email is required", // Custom test to ensure email is not just whitespace
        (value) => value && value.trim() !== "" // Checks if email has non-whitespace characters
      ),

    // Password validation
    password: Yup.string()
      .required("Password is required") // Password cannot be empty
      .min(6, "Password must have at least 6 characters") // Password must have at least 6 characters
      .max(10, "Password must have characters in between 6 to 10") // Password should not exceed 10 characters
      .test(
        "is-empty",
        "Password is required", // Custom test to ensure password is not just whitespace
        (value) => value && value.trim() !== "" // Checks if password has non-whitespace characters
      ),
  });

// Validation schema for checkout page
export const checkoutValidationSchema = () =>
  Yup.object().shape({
    // Country selection validation
    countrySelect: Yup.string().required("Country name is required."), // Country cannot be empty

    // First name validation
    firstname: Yup.string()
      .required("First name is required.") // First name cannot be empty
      .min(3, "First name must be at least 3 characters.") // First name must have at least 3 characters
      .test(
        "is-empty",
        "First name is required.", // Custom test to ensure first name is not just whitespace
        (value) => value && value.trim() !== "" // Checks if first name has non-whitespace characters
      ),

    // Last name validation
    lastname: Yup.string()
      .required("Last name is required.") // Last name cannot be empty
      .min(3, "Last name must be at least 3 characters.") // Last name must have at least 3 characters
      .test(
        "is-empty",
        "Last name is required.", // Custom test to ensure last name is not just whitespace
        (value) => value && value.trim() !== "" // Checks if last name has non-whitespace characters
      ),

    // Address validation
    address: Yup.string()
      .required("Address is required.") // Address cannot be empty
      .min(3, "Address must be at least 3 characters.") // Address must have at least 3 characters
      .test(
        "is-empty",
        "Address is required.", // Custom test to ensure address is not just whitespace
        (value) => value && value.trim() !== "" // Checks if address has non-whitespace characters
      ),

    // Town or city validation
    town: Yup.string()
      .required("Town or city is required.") // Town or city cannot be empty
      .min(3, "Town or city must be at least 3 characters.") // Town or city must have at least 3 characters
      .test(
        "is-empty",
        "Town or city is required.", // Custom test to ensure town/city is not just whitespace
        (value) => value && value.trim() !== "" // Checks if town/city has non-whitespace characters
      ),

    // State validation
    state: Yup.string()
      .required("State is required.") // State cannot be empty
      .min(3, "State name must have at least 3 characters.") // State must have at least 3 characters
      .test(
        "is-empty",
        "State is required.", // Custom test to ensure state is not just whitespace
        (value) => value && value.trim() !== "" // Checks if state has non-whitespace characters
      ),

    // Postal code validation (6-digit Indian postal code)
    postalcode: Yup.string()
      .required("Zip/Postal code is required.") // Postal code cannot be empty
      .matches(/^[0-9]{6}$/, "Zip / Postal code must be at least 6 numbers.") // Postal code must be a 6-digit number
      .test(
        "is-empty",
        "Zip/Postal code is required.", // Custom test to ensure postal code is not just whitespace
        (value) => value && value.trim() !== "" // Checks if postal code has non-whitespace characters
      ),

    // Email validation (same as login)
    email: Yup.string()
      .required("Email is required.") // Email cannot be empty
      .email("Email must be a valid email address") // Must be a valid email format
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
        "Email must be a valid email address & ends with domain .com" // Custom regex to ensure email ends with .com domain
      )
      .test(
        "is-empty",
        "Email is required", // Custom test to ensure email is not just whitespace
        (value) => value && value.trim() !== "" // Checks if email has non-whitespace characters
      ),

    // Phone number validation (10-digit Indian number starting with 7, 8, or 9)
    phoneno: Yup.string()
      .required("Phone number is required.") // Phone number cannot be empty
      .matches(
        /^[7-9][0-9]{9}$/,
        "Phone number must be a 10-digit Indian number starting with 7, 8, or 9." // Validates Indian phone number
      )
      .test(
        "is-empty",
        "Phone number is required.", // Custom test to ensure phone number is not just whitespace
        (value) => value && value.trim() !== "" // Checks if phone number has non-whitespace characters
      ),
  });
