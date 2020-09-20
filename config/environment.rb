# Load the Rails application.
require_relative 'application'

# Initialize the Rails application.
Rails.application.initialize!
# Jbuilder return camelcase keys
Jbuilder.key_format camelize: :lower
