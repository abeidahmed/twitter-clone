class FileUpload
  def initialize(file, file_location:, **options)
    @file = file
    @file_location = file_location
  end

  attr_reader :file, :file_location

  def upload_image!
    delete_prev_image if deletable?
    upload_new_image
  end

  private
  def upload_new_image
    if file.present? && !file.instance_of?(String)
      Cloudinary::Uploader.upload(file)
    else
      Hash['url': nil]
    end
  end

  def delete_prev_image
    file_id = File.basename(file_location, '.*')
    Cloudinary::Uploader.destroy(file_id)
  end

  def deletable?
    file_location.present? && !file.instance_of?(String)
  end
end