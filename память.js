// Предположим, что у вас есть дата рождения в формате строки 'YYYY-MM-DD'
const dateOfBirth = '1990-05-15';

// Получите разницу между текущей датой и датой рождения
const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};

const age = calculateAge(dateOfBirth);
console.log('Возраст:', age); // Результат - возраст в годах





router.put('/:userId', verifyToken, upload.single('photo'), async (req, res) => {
    try {
        const { userId } = req.params;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: 'Пользователь не найден' });
        }

        // Проверяем, есть ли у пользователя старая фотография, и удаляем её
        if (user.photo) {
            try {
                // Удаляем старую фотографию из файловой системы
                fs.unlinkSync(user.photo);
                // Очищаем ссылку на старую фотографию в базе данных
                user.photo = null;
            } catch (error) {
                console.error('Ошибка удаления старой фотографии:', error);
                // Если возникла ошибка при удалении файла, можно отправить ответ с ошибкой
                return res.status(500).json({ error: 'Произошла ошибка при удалении старой фотографии' });
            }
        }

        // Загружаем новую фотографию, если есть
        if (req.file) {
            user.photo = req.file.path;
        }

        // Производим другие обновления профиля, если они есть (например, имя, пароль)
        if (req.body.name) {
            user.name = req.body.name;
        }
        // ... другие обновления профиля

        // Сохраняем обновленного пользователя
        await user.save();

        res.json({
            userId: user.id,
            name: user.name,
            email: user.email,
            photo: user.photo, // Отправляем ссылку на новую фотографию обратно
        });
    } catch (error) {
        console.error('Ошибка при обновлении профиля:', error);
        res.status(500).json({ error: 'Произошла ошибка при обновлении профиля' });
    }
});