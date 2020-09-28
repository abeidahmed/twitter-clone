class FileUpload
  def initialize(file:, file_location:, action:, **options)
    @file = file
    @file_location = file_location
    @action = action
  end

  attr_reader :file, :file_location, :action

  def upload_image!
    delete_prev_image if deletable?
    upload_new_image
  end

  def delete_image!
    delete_prev_image
  end

  private
  def upload_new_image
    if uploadable?
      Cloudinary::Uploader.upload(file)
    else
      Hash['url': nil]
    end
  end

  def delete_prev_image
    return if file_location.nil?
    file_id = File.basename(file_location, '.*')
    Cloudinary::Uploader.destroy(file_id)
  end

  def deletable?
    is_update_action? && file_location.present? && !file.instance_of?(String)
  end

  def uploadable?
    file.present? && !file.instance_of?(String)
  end

  def is_update_action?
    action == 'update'
  end
end